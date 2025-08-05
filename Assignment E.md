---
layout: page
title: "AE: Contextual AR Experience"
---

# Description
Create an interactive mobile AR experience, focusing on spatial awareness, tracking, anchoring, interaction, and environmental integration. Make the AR experience **context-aware** to augment a real or simulated physical object, emphasizing reliable registration and meaningful user interaction on handheld devices.

## Goals
- Configure and develop an AR Foundation mobile project (iOS or Android).  
- Implement spatial awareness (planes, occlusion) and persistent augmentation through anchors or image tracking.  
- Design and enable user interaction with augmented content (touch-based).  
- Ensure visual consistency of virtual content with real-world lighting cues.  
- Handle degradation (e.g., tracking loss) gracefully.  
- Communicate design intent and robustness through documentation.

## Requirements
Create a mobile AR application that augments a physical or simulated engineering object or environment relevant to XFactory. Required features:  

- **Spatial Awareness & Occlusion:** Detect planes (and/or use meshing if supported) and implement occlusion so virtual objects respect real geometry.  
- **Persistent Anchoring or Image Tracking:** Use either tracked images (reference image library) or anchor-on-tap such that augmentation persists stably across device movement and session continuity. Ideally, incorporate both.
- **Augmented Content Interaction:** Enable the user to interact via touch (e.g., toggle states, reveal metadata, reposition augmentation) with appropriate feedback.  
- **Visual Consistency:** Use environment probes or approximated lighting to make virtual content blend with the scene (e.g., basic light estimation, consistent shadows/highlights).  
- **Tracking Degradation Handling:** Detect degraded tracking (e.g., lost plane or anchor) and provide recovery cues or fallback behavior (e.g., visual hint, re-localization prompt).  
- **Mobile Focus:** Implementation must target mobile devices (no requirement for AR headsets). If device testing is not possible for every student, include instructions for using device simulators/emulators where feasible and clearly note any limitations.

> At a minimum, include one persistent augmentation point (image or anchor), plane detection + occlusion, a touch interaction that changes the augmentation, and a degradation/recovery mechanism. Avoid overly elaborate content that distracts from interaction fidelity and robustness; focus on stability and user clarity.

## Checkpoints

1. **Project Bootstrap (early):** Working AR Foundation project with platform target set (iOS or Android), basic AR session starting, and short README snippet on how to deploy/test on a mobile device.

2. **Spatial Awareness Demo (mid):** Evidence of plane detection and occlusion working—submit annotated screenshots or a short video/gif plus a description of how occlusion was achieved.

3. **Anchoring/Image Tracking Prototype:** Demonstrate persistent augmentation on tracked image or anchor-on-tap; include a brief explanation of the anchor lifecycle and any recovery strategy for loss of tracking.

## Graduate Extension

Graduate students extend the core assignment by incorporating insights from recent research in mobile AR with engineering relevance.
 
1. **Targeted Literature Review:**  
   - Select **3–4 peer-reviewed papers** from top-tier venues such as **IEEE ISMAR, IEEE VR, ACM CHI, ACM UIST, ACM DIS**, or similarly reputable XR/interaction conferences. Suggested topic areas: tracking & registration fidelity, multimodal input in AR (e.g., touch + contextual sensing), context-aware augmentation, industrial AR use cases (assembly guidance, maintenance, real-time monitoring), persistent spatial anchoring under drift, or user perception of AR consistency.  
   - Summarize each paper (≤250 words) focusing on: the engineering problem, AR technique or insight, and how it informs stable/mobile AR system design.

2. **Research-Informed Enhancement Proposal:**  
   - Define one concrete enhancement to your AR experience inspired by the literature. Examples include a hybrid persistence mechanism combining image fiducials with anchor relocalization, context-aware content adjustment based on detected environmental cues (e.g., adapt overlay visibility under changing light or occlusion), or multimodal augmentation triggers combining touch with inferred context (e.g., proximity-based hints).  
   - Write a **research memo (2–3 pages)** that connects selected literature to the enhancement idea, describes the design and intended integration (conceptual or partially implemented), and discusses expected robustness benefits and limitations in an engineering deployment.

3. **Optional Mini Evaluation:**  
   - (Encouraged) Perform a simple robustness test (peer or self-run) under at least two disturbance conditions (e.g., partial occlusion, lighting change, device movement) and log the augmentation persistence or recovery success. 
   - Include a short reflection (~1 page) on what worked, what failed, and how literature insights could mitigate issues.


---

# Submission

Submissions must be made individually via GitHub Classroom. 

## Deliverables

- Unity AR Foundation mobile project in the GitHub Classroom repository.  
- README with setup/deployment instructions for mobile testing, description of chosen augmentation target, and how to exercise interactions.  
- Evidence of spatial awareness + occlusion, persistent augmentation, interaction, and degradation handling (screenshots, short demo video, or log).  
- (Grad only) Literature summaries, research memo, and optional evaluation reflection/data.

## Guidelines

- All work committed to the assigned GitHub Classroom repo.  
- Final submission on `main` branch tagged `module-e-v1`.  
- README must include: device platform target, steps to reproduce the AR experience, description of interaction and persistence mechanisms, and (for grad) full citations of literature sources.  
- Provide any reference images or assets needed to reproduce image tracking targets.  
- Clearly note limitations if full mobile deployment/testing wasn't possible (e.g., due to hardware access constraints).

## Grading Rubric

**Undergraduate Core (100 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Spatial Awareness & Occlusion | Plane detection and occlusion implemented reliably; virtual content respects real geometry. | 25 |
| Explanation of Spatial Data Use | Clarity on how spatial data informs augmentation behavior. | 10 |
| Persistent Anchoring / Image Tracking | Stable augmentation across movement; lifecycle handled; fallback mechanism. | 20 |
| Interaction & Feedback | Touch-based interaction works; responsive feedback provided. | 15 |
| Visual Consistency & Contextual Integration | Lighting approximation/environment blending makes augmentation sensible. | 15 |
| Degradation Handling | Detects tracking loss; user guided to recover gracefully. | 10 |
| Documentation & Reproducibility | Clear README, reproduction steps, required assets provided. | 10 |
| Scope & Coherence | Focused augmentation; avoids unnecessary complexity. | 5 |

**Graduate Extension Add-On (up to 25 points)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Literature Review Quality | Well-chosen papers from allowed venues; summaries tied to mobile AR engineering. | 8 |
| Enhancement Framing & Insight | Strong linkage from literature to proposed enhancement; thoughtful design proposal. | 9 |
| Optional Evaluation Reflection | Evidence or thoughtful analysis of robustness tests; insights tied back to literature. | 8 |