---
layout: page
title: "AC: Custom Logic for XR"
---

# Description
This assignment centers on the scripting backbone of XR in Unity, emphasizing decision logic, methods, collections, the MonoBehaviour lifecycle, and the organization power of namespaces. You will build the **custom logic engines and components** that could later drive those interactions.

## Goals
- Implement clear decision-making logic and reusable methods in C#.  
- Use collections for managing state and groups of entities.  
- Understand and apply basic object-oriented concepts at a high level (abstraction/encapsulation) to structure code.  
- Author and correctly use MonoBehaviour scripts with appropriate lifecycle methods.  
- Organize code with namespaces to separate concerns and avoid naming conflicts.  
- Communicate architecture and behavior through documentation.

## Requirements
Design and implement a suite of Unity C# MonoBehaviour components that encapsulate a small XFactory subsystem (logic, state, and decision-making—no grab/attach yet). **Examples:** a drone coordinator that “flies” to scan barcodes, queues retry logic, and escalates inventory mismatches; an AGV/AMR delivery planner that routes around dynamic obstacles, prioritizes urgent shipments, and falls back on failures; or a lighting/access supervisor that switches modes (normal, energy-save, emergency), locks/unlocks zones, and raises tiered alerts based on simulated sensor inputs.

- **MonoBehaviour Scripts:** Create at least three custom C# MonoBehaviour scripts demonstrating:  
  - Decision logic (if/switch, loops) with clear branching.  
  - Methods with parameters and return values supporting reuse.  
  - Use of collections (List, Dictionary, or both) to manage dynamic sets of stateful objects or events.  
- **Basic OOP Structuring:** Encapsulate shared logic (e.g., via a base class or helper class), showing separation of concerns—even if shallow (heavy-depth inheritance is not required).  
- **Namespace Usage:** Organize your scripts into at least two logical namespaces (e.g., `XFactory.Core`, `XFactory.Extensions`) to demonstrate preventing name collisions and grouping.  
- **Lifecycle Awareness:** Use MonoBehaviour lifecycle methods appropriately (`Start`, `Update`, `OnEnable`/`OnDisable`, and at least one simulated event).  
- **Test Harness or Driver Scene:** Provide a Unity scene or console/UI interface where the logic can be exercised (e.g., toggling modes, injecting simulated inputs, viewing aggregated output).  
- **Code Overview Document:** Explain the architecture, namespace structure, decision logic flow, and how the components relate.

> Keep abstraction simple—depth is less important than clarity and correct separation (e.g., a `StatusProvider` base with two concrete variants is fine; a ten-level inheritance tree is not needed). Target ~6–8 hours effort; clarity of logic and explanation outweigh clever but opaque code.

## Checkpoints

1. **MonoBehaviour Skeletons (early):** Commit initial class skeletons with namespace declarations and comments describing intended behavior for each.  

2. **Collection Demonstration (mid):** Submit a small standalone scene or code snippet showing dynamic use of a collection (e.g., adding/removing simulated alerts into a List, indexing status entries in a Dictionary) with a short explanation.  

3. **Decision Logic Diagram:** Upload a simple flowchart or diagram (digital or photographed) for one core decision path (e.g., how mode switching happens based on multiple inputs), with a brief narrative in markdown.

## Graduate Extension

Graduate students augment the core assignment by grounding component design in recent research from premier venues:
 
1. **Focused Literature Review:**  
   - Select **3–4 peer-reviewed publications** from top-tier venues such as **IEEE ISMAR, IEEE VR, ACM CHI, ACM UIST, ACM DIS**, or similar human-computer interaction / immersive systems conferences that explore topics relevant to logic, state management, adaptation, or system organization in XR for engineering contexts (examples: context-aware system decision frameworks in AR/VR, cognitive load-aware mode switching, scalable modular architecture for real-time interactive systems).  
   - Provide concise summaries (≤250 words per paper) highlighting: the engineering challenge, how XR systems structured decision or logic, and any architectural/design insight you can borrow.

2. **Research-Informed Enhancement Proposal:**  
   - Based on that literature, define one **specific enhancement or design refinement** to your logic suite. Examples include introducing a pluggable policy layer for mode selection inspired by adaptive systems research, or applying a prioritization schema for alerts based on findings about operator attention in immersive interfaces.  
   - Write a **research memo (2–3 pages)** that connects the literature to your system design, describes the enhancement conceptually (and, if feasible, sketches its integration), and reflects on anticipated benefits or design trade-offs in the engineering XR setting.

3. **Alternative Implementation Comparison:**  
   - Implement **two stylistically different but functionally equivalent versions** of one core component (e.g., one using a tightly coupled monolithic script vs. one refactored into modular, namespaced helper classes, or one using simple conditional branching vs. a table-driven decision approach).  
   - Include a brief comparison write-up (1 page) discussing maintainability, readability, extensibility, and how the literature influenced your preferred style.


---

# Submission

Submissions must be made individually via GitHub Classroom. 

## Deliverables

- Unity project/scripts in GitHub Classroom repository.  
- Working logic driver scene or harness.  
- Code Overview Document (Markdown/PDF) explaining architecture, namespaces, and decision flows.  
- Flowchart/diagram for decision logic.  
- (Grad only) Literature summaries, research memo, and comparison write-up plus the two implementations demonstrating the alternative styles.

## Guidelines

- Commit all code and assets to the assigned GitHub Classroom repo.  
- Final submission on `main` branch with a tagged release `module-c-v1`.  
- README.md must include: subsystem chosen, how to exercise the logic, explanation of namespaces used, and (for grad) full citations (in standard format) of reviewed papers.  
- Use clear naming conventions separating core vs. graduate extension code (e.g., namespace labels, directory `grad_extension/`).  
- Provide sample inputs/triggers and expected outputs so a reviewer can easily test.

## Grading Rubric

**Undergraduate Core (100 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| MonoBehaviour & Lifecycle Usage | Appropriate use of lifecycle methods; clear separation of responsibilities. | 20 |
| Decision Logic & Methods | Well-structured branching logic; reusable methods; documented flow via flowchart. | 20 |
| Collections & State Management | Effective use of Lists/Dictionaries; safe iteration; state updates reflected. | 15 |
| Namespace Organization | Logical grouping using namespaces; avoids naming collisions; clarity of boundaries. | 15 |
| Code Architecture & Clarity | Encapsulation of logic; simple OOP usage; clean API surfaces. | 15 |
| Driver/Test Harness & Demonstration | Easy way to exercise components; observable outputs; clear instructions. | 10 |
| Documentation & Repository Hygiene | README clarity, commit structure, naming conventions. | 5 |

**Graduate Extension Add-On (up to 20 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Literature Review Relevance & Quality | Appropriate paper selection from allowed venues; accurate summaries; relevance to XR engineering logic. | 8 |
| Enhancement Framing & Insight | Clear linkage between literature and proposed refinement; thoughtfulness about engineering impact. | 7 |
| Alternative Implementation Comparison | Two distinct variants provided; comparison shows understanding of trade-offs. | 5 |