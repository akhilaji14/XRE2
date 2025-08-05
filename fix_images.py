#!/usr/bin/env python3
import os
import re

def fix_gatech_images(filepath):
    """Fix Georgia Tech GitHub image URLs to work properly"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Pattern to match Georgia Tech GitHub image URLs
    # ![01](https://github.gatech.edu/mmoghaddam3/XRE/assets/102151/0b9cdbda-bd1a-40bb-b436-b085feb8266a)
    gatech_pattern = r'!\[([^\]]*)\]\(https://github\.gatech\.edu/mmoghaddam3/XRE/assets/\d+/([a-f0-9\-]+)\)'
    
    def replace_gatech_images(match):
        alt_text = match.group(1)
        image_id = match.group(2)
        # Convert to raw GitHub URL that will work
        raw_url = f"https://github.gatech.edu/mmoghaddam3/XRE/raw/main/assets/{image_id}"
        return f'![{alt_text}]({raw_url})'
    
    content = re.sub(gatech_pattern, replace_gatech_images, content)
    
    # Also handle any variations or missed patterns
    gatech_pattern2 = r'!\[([^\]]*)\]\(https://github\.gatech\.edu/([^/]+)/([^/]+)/assets/([^)]+)\)'
    
    def replace_gatech_images2(match):
        alt_text = match.group(1)
        user = match.group(2)
        repo = match.group(3)
        asset_path = match.group(4)
        # Convert to raw URL
        raw_url = f"https://github.gatech.edu/{user}/{repo}/raw/main/assets/{asset_path}"
        return f'![{alt_text}]({raw_url})'
    
    content = re.sub(gatech_pattern2, replace_gatech_images2, content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    """Fix image URLs in all markdown files"""
    
    # Get all markdown files in current directory
    md_files = [f for f in os.listdir('.') if f.endswith('.md') and f not in ['index.md', 'about.md']]
    
    if not md_files:
        print("❌ No content markdown files found!")
        print("Make sure you're in the directory with your markdown files")
        return
    
    print(f"Found {len(md_files)} markdown files. Fixing Georgia Tech image URLs...")
    print("-" * 60)
    
    fixed_count = 0
    total_images = 0
    
    for filename in md_files:
        try:
            # Count images in file before fixing
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
                image_count = len(re.findall(r'!\[([^\]]*)\]\([^)]+\)', content))
                total_images += image_count
            
            if fix_gatech_images(filename):
                print(f"✔️ Fixed images in: {filename} ({image_count} images)")
                fixed_count += 1
            else:
                if image_count > 0:
                    print(f"⚪ No changes needed: {filename} ({image_count} images)")
                else:
                    print(f"⚪ No images found: {filename}")
        except Exception as e:
            print(f"❌ Error fixing {filename}: {e}")
    
    print("-" * 60)
    print(f"✔️ Done! Fixed images in {fixed_count} files.")
    print(f"📊 Total images found: {total_images}")
    
    if fixed_count > 0:
        print("\n🚀 Next steps:")
        print("1. Commit and push your changes:")
        print("   git add .")
        print("   git commit -m 'Fix Georgia Tech image URLs'")
        print("   git push")
        print("2. Wait 2-3 minutes for GitHub Pages to rebuild")
        print("3. Check if images now display correctly")
    else:
        print("\n🔍 If no files were fixed, the image URL format might be different.")
        print("Can you share an example image line from one of your files?")

if __name__ == "__main__":
    main()