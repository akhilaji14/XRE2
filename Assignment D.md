---
layout: page
title: "AD: Interactive VR Experience"
---

# Description
Bring together XR-specific interaction design and implementation in immersive VR contexts by building a VR-capable interaction module for XFactory, focusing on locomotion, activation flows, multimodal feedback (touch/audio), and in-world UI, while accounting for comfort and usability. Headset hardware is not required—you may use Unity’s XR Simulator or the Meta XR Simulator asset to develop and test.

## Goals
- Configure a Unity project for VR using XR Plug-in Management and simulate VR input if hardware is unavailable.  
- Implement locomotion with comfort features.  
- Build activation flows with clear state feedback.  
- Integrate multimodal feedback: haptic (or simulated), spatial audio, and visual cues.  
- Design and place readable in-world UI in the VR scene.  
- Reflect on performance/design trade-offs relevant to VR experiences.

## Requirements
Create an interactive VR mini-module representing a focused subsystem of XFactory (e.g., a component pickup-and-activate sequence, navigating between machine zones, or toggling machine states). Your scene must include:  
 
- **Locomotion System:** At least two locomotion modalities must be included, such as teleportation and one continuous movement option (e.g., smooth move or snap turn). Incorporate comfort mechanisms (e.g., fade on teleport, snap turning thresholds, adjustable movement speed) with explanation of design choices.  
- **Activation Interaction:** Include one object or system whose state can be activated/deactivated (e.g., powering a conveyor, enabling a control panel) with clear visual, audio, and/or haptic feedback tied to the change.  
- **Multimodal Feedback:** Enable hover/select feedback (simulated haptics if no controller supports it), and at least one use of spatial audio to reinforce interaction context.  
- **In-World UI:** Create a VR-appropriate status or instruction panel (e.g., machine health, current mode) using world-space UI, designed for readability and minimal obstruction.  
- **Grabbables/Sockets:** Include at least 1-2 grabbales along with sockets to simulate object placement, attachment or assembly in your VR experience.  
- **Performance/Design Reflection:** Document at least three considerations or lightweight implementations related to VR usability or perceived performance (e.g., reducing motion sickness via locomotion tuning, limiting visual complexity during movement, audio attenuation zones). Implementation can be conceptual with evidence of applied settings.

> If you do not have a physical VR headset, use one of the following to develop and test: (1) Unity’s **XR Device Simulator** (built-in package for simulating controllers and head movement). (2) Community-supported tools such as the **Meta XR Simulator** (available via Unity Asset Store) to approximate controller input and headset pose. Ensure your README explains how to enable and use the simulation so reviewers can reproduce without headsets.


## Checkpoints

1. **VR Project Initialization (early):** Commit with XR Plug-in Management configured, simulator enabled (or hardware detected), and a brief README snippet explaining how to launch/test the project with or without a headset.

2. **Locomotion Prototype (mid):** Demonstrate teleportation plus continuous movement; include a short description of implemented comfort features and how a user would control them.

3. **Activation + Feedback Demo:** Show the activation flow working (toggle/change state) with bundled feedback (visual/audio/haptic) and document the intended user perception (e.g., what cues signal success/failure).

## Graduate Extension

Graduate students deepen the core assignment by integrating insights from recent VR research in engineering and human-centered immersive interaction.
 
1. **Targeted Literature Review:**  
   - Select **3–4 peer-reviewed papers** from prominent venues such as **IEEE VR, IEEE ISMAR, ACM CHI, ACM UIST, ACM DIS**, or comparable high-quality XR/interaction conferences. Focus areas should be directly relevant to this module’s core topics: locomotion and motion sickness mitigation, activation affordances in VR, UI/UX in immersive contexts, multimodal feedback (haptics/audio), comfort/adaptive interaction, or readiness indicators for future grabbing/socket workflows.  
   - Provide concise summaries (≤250 words each) capturing: the research question, key findings or techniques, and implications for engineering VR interfaces.

2. **Research-Informed Enhancement Proposal & Integration:**  
   - Based on the literature, design one enhancement to your VR module. Examples include adaptive locomotion tuning based on simulated user “discomfort” signals, context-sensitive feedback intensity modulation (audio/haptic) inspired by perceptual salience research, or dynamic UI repositioning to maintain readability during user movement, grounded in spatial cognition findings.  
   - Implement a **lightweight variant** or mock-up of that enhancement (e.g., toggled mode, heuristic-based adaptation, or a “smart” UI anchor behavior).  
   - Write a **study memo (3 pages)** that connects the chosen papers to your design decision,  describes the implemented or planned enhancement, and reflects on expected benefits, limitations, and potential next steps for an engineering deployment.

3. **Comparative Interaction Insight (alternative to raw optimization):**  
   - Provide a brief side-by-side comparison (1 page) of two interaction approach variants from your module (for instance: fixed vs. adaptive comfort parameters; static UI vs. context-aware repositioning)
   - Discuss trade-offs in usability, cognitive load, and engineering complexity, referencing at least one of your reviewed papers.


---

# Submission

Submissions must be made individually via GitHub Classroom. 

## Deliverables

- Unity project with the VR interaction scene in the GitHub Classroom repo.  
- README with clear instructions for running/testing (including simulator setup if no headset).  
- Evidence of locomotion, activation, and feedback (screenshots, short video/GIF, or clear in-scene controls).  
- Documentation of comfort/design choices and “ready-for-grabbables” placeholders.  
- (Grad only) Literature summaries, enhancement implementation or mock-up, study memo, and comparative insight write-up.

## Guidelines

- All content must be in the assigned GitHub Classroom repository.  
- Final submission on `main`, tagged `module-d-v1`.  
- README must include: how to launch the scene, input mappings or simulated controls, description of locomotion and activation flows, and for grad: citations of reviewed papers in a standard format.  
- Label directories to separate core work from graduate extension materials (e.g., `grad_extension/`).  
- Provide reproduction steps so a reviewer without VR hardware can still experience core behaviors via simulation.

## Grading Rubric

**Undergraduate Core (100 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Locomotion & Comfort Features | Teleportation + continuous movement; comfort mechanisms explained and usable. | 25 |
| Activation Interaction & Feedback | State change with synchronized visual/audio/haptic cues; clear affordances. | 20 |
| Multimodal Feedback Integration | Hover/select feedback; spatial audio; simulated haptics or equivalents. | 15 |
| In-World UI Design | Readable, well-placed world-space UI conveying state/instructions without clutter. | 10 |
| Simulation/Hardware Flexibility & Instructions | Clear support for non-headset evaluation (simulator) and reproducibility. | 10 |
| Preparation for Grabbables/Sockets | Placeholder/mock-up demonstrating extensibility and intended future integration. | 5 |
| Documentation & Project Hygiene | README clarity, tagging, organization, demo evidence. | 5 |
| Design Reflection | Thoughtful documentation of usability/design considerations (comfort, feedback, etc.). | 10 |

**Graduate Extension Add-On (up to 25 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Literature Review Quality | Relevant papers from allowed venues; accurate summaries on VR interaction topics. | 8 |
| Enhancement Design & Integration | Research-informed enhancement implemented or sketched; clear connection to prior work. | 10 |
| Comparative Interaction Insight | Side-by-side reasoning of two variants; trade-offs articulated with literature reference. | 7 |