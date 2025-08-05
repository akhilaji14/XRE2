---
layout: page
title: "AB: Scene Composition for XR"
---

# Description
Apply your foundational Unity skills by creating an **industrial station** similar in complexity to one of the sample stations provided in XFactory (e.g., Logistics, Manufacturing, Assembly, Welding, Exhibit) using the supplied assets. The emphasis should be on thoughtful scene composition, appropriate use of Unity features (prefabs, materials, lighting), and clear design rationale—not necessarily deep optimization, which comes later in Module D.

## Goals
- Use Unity Editor effectively to assemble a coherent scene.  
- Structure scenes with nested prefabs and meaningful hierarchy.  
- Apply materials and lighting to support readability and basic realism.  
- Prepare the scene for future interaction (basic physics setup).  
- Communicate design decisions clearly.

## Requirements
Using the provided base sample scene as a reference, create **a new industrial station** (either: replicate a similar station with variation, or design a different but comparable industrial station) using only the supplied XFactory assets. Your scene must:  
- Be a cohesive industrial station (e.g., a variation of the manufacturing station, a custom logistics node, a modified assembly bay).  
- Use **nested prefabs** to organize repeated or modular elements (e.g., shelving units, tool racks, machine clusters).  
- Include at least **five distinct interactive-ready objects** (each with placeholder components): e.g., boxes with Rigidbodies/colliders, a machine with status panel, a tool that could be grabbed later, etc.  
- Configure **materials** so no magenta errors exist, and demonstrate reuse (e.g., shared materials for similar surfaces).  
- Set up **basic lighting**: include ambient light and at least two light sources; justify choices in design rationale.  
- Include a simple **UI overlay** (e.g., a status/instruction panel) implemented with Canvas, anchored appropriately in the scene.  
- Include **one physics-prepared object** (Rigidbody + Collider) that is clearly intended for future interaction (tagged/layered appropriately).  
- Provide a **Design Rationale Document** (1–2 pages) explaining: station purpose, prefab hierarchy decisions, material usage, lighting choices, UI intent, and how the scene would serve an XR use case (e.g., training, monitoring, assembly guidance).

> Avoid building overly sprawling “mega-scenes.” Focus on one logical station area; if students wish to add detail, it should support a clear functional purpose (not purely decorative). Aim to spend ~6–8 hours on the major assignment; complexity should be balanced with clarity and justification.

## Checkpoints

1. **Prefab Structure Snapshot (due early):** Submit a short markdown (or commit) showing your prefab hierarchy: what groups you modularized, why, and how reuse is achieved. Include a screenshot of the hierarchy.  

2. **Material & Lighting Sketch (midway):** In README or separate markdown, describe your material reuse strategy and lighting plan. Include a small annotated screenshot of the scene lighting (what each light is for and intended effect).  

3. **Interaction Readiness Indicator:** Identify and tag the five interactive-ready objects. Submit a list (in repo) with their intended future interaction role (e.g., “Box: grabbable; Control panel: activation switch”) and evidence (e.g., screenshot showing tags/components).

## Graduate Extension

Graduate students extend the core assignment with a **focused literature-informed element**:
 
1. **Targeted Literature Review:**  
   - Select **3–4 recent (past 5 years preferred)** peer-reviewed papers from venues such as **IEEE ISMAR, IEEE VR, ACM CHI, ACM UIST, ACM DIS**, or similar reputable human-computer/immersive systems conferences that relate to XR use in engineering contexts (e.g., industrial training, spatial interface design for assembly, mixed-reality monitoring dashboards, human-in-the-loop system visualization).  
   - Summarize each paper briefly (≤250 words each), emphasizing: the engineering problem addressed, XR affordances exploited, and any design insights relevant to your station.

2. **Research-Driven Enhancement Proposal:**  
   - Based on the literature, define one **specific enhancement or design twist** to your station (e.g., overlay guidance inspired by a paper’s interaction technique, adaptive status visualization for operator attention from a study on salience, or spatial anchoring choices motivated by user workload findings).  
   - Write a concise **research memo (2–3 pages)** that connects the selected literature to the station created, describes the proposed enhancement (conceptual or small prototype idea), and reflects on expected benefits or trade-offs for an engineering XR application.

3. **Optional Prototype Sketch or Mini-Demo:**  
   - (Strongly encouraged) Implement a lightweight prototype or variant illustrating the enhancement (could be a toggled overlay, a modified UI behavior, or a mockup using existing assets). 
   - If not implemented, include a detailed design sketch or mockup and a justification for why a full implementation would be beneficial in future work.


---

# Submission

Submissions must be made individually via GitHub Classroom. 

## Deliverables

- Unity project (or relevant scene/package) in GitHub Classroom repo.  
- Scene asset with nested prefabs, lighting, materials, UI, and tagged interactive-ready objects.  
- Design Rationale Document (PDF or Markdown).  
- Mini-checkpoint artifacts (prefab snapshot, material/lighting description, interaction readiness list).  
- (Grad only) Literature summaries, research memo, and optional prototype/sketch (with explanation).

## Guidelines

- All content must be committed to the assigned GitHub Classroom repository.  
- Use clear commit messages; final submission should be on the `main` branch with a tagged release named `module-b-v1`.  
- Top-level `README.md` must include: station chosen/created, how to open/run the scene, team members, list of interactive-ready objects with their intended roles, and (for grads) literature sources cited with full references.  
- Include screenshots or a short embedded animated GIF/video (hosted via link in repo) showing the scene and key features.  
- Filename conventions: `DesignRationale.pdf` or `.md`, `LitReview.md` (grad), etc.

## Grading Rubric

**Undergraduate Core (100 points)**

| Criterion | Description | Points |
|----------|-------------|--------|
| Scene Design & Cohesion | Coherent industrial station; purposeful asset placement; avoids aimless clutter and balanced scope. | 20 |
| Prefab Hierarchy & Modularization | Nested prefabs meaningfully group/reuse elements; structure shown in checkpoint. | 15 |
| Materials & Lighting | No material errors; reuse; lighting supports intent; rationale provided. | 15 |
| UI Overlay | Functional Canvas panel, appropriately placed, communicates relevant info. | 10 |
| Interaction Readiness | Five interactive-ready objects identified, tagged, and explained with plausible future roles. | 15 |
| Design Rationale Document | Clear explanations tying decisions to XR use case; reflection on strengths/limitations. | 10 |
| Mini-Checkpoints & Process Evidence | All three checkpoints submitted with substantive content on time. | 10 |
| Repository Hygiene & README | Clear README, organized files, tagging/release, illustrative media. | 5 |

**Graduate Extension Add-On (up to 20 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Literature Review Quality | Relevance and quality of selected papers from allowed venues; accurate summarization. | 8 |
| Enhancement Proposal & Framing | Logical connection from literature to proposed design change; clarity of expected impact. | 7 |
| Prototype or Design Elaboration | Implemented mini-prototype or high-fidelity sketch with justification and feasibility discussion. | 5 |