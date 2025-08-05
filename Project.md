---
layout: page
title: "XRE Capstone Team Project"
---

# Description
Teams of **3–4 students** (undergraduate teams separate from graduate teams) will conceive, design, implement, and validate an **XR application** addressing a **real-world engineering problem or need**. To ensure balanced exposure, every project must include **both VR and AR components**—either as an integrated hybrid experience or as two complementary subsystems that together solve the defined engineering challenge. While XFactory can be used as inspiration or a base, teams are free to choose a different domain or system—as long as the project satisfies the constraints below. The project must integrate core technical topics and apply human-centered and XR design principles introduced early in the semester (Module A > A2).

## Goals
- **Define and justify** a real-world engineering problem suitable for XR intervention.  
- **Apply key XR technical topics** (Unity/C# scripting, VR locomotion/navigation/UI, AR spatial awareness/tracking/anchoring, interaction logic, feedback) to build working VR and AR components.  
- **Embed human-centered XR design principles** throughout conceptualization, prototyping, and evaluation.  
- **Perform internal testing and validation**, including formative usability testing, to iteratively improve both AR and VR experiences.  
- **Communicate design and technical decisions** through documentation, presentations, and reflective analysis.  
- **Assess team dynamics** via structured peer evaluation to ensure accountability and balanced contribution.

## Requirements

- **Engineering Relevance:** Problem must be grounded in an engineering domain (e.g., manufacturing, healthcare, infrastructure, product design, robotics, maintenance, training, remote operation, design visualization).  
- **Dual XR Integration:** Must include **both VR and AR components**. These can be either a unified hybrid workflow (e.g., AR used for in-situ setup and VR for immersive training), or two complementary subsystems (e.g., VR simulation plus AR real-world monitoring) that together address the same problem.  
- **Technical Breadth:** Must leverage at least **three major technical pillars** from the course across the AR+VR pieces.  
- **Real-World Framing:** Define stakeholders, users, and articulate value of the AR+VR solution.  
- **Design Principle Application:** Explicitly apply and document human-centered/XR design principles.  
- **Internal Testing and Validation:** Conduct at least **two rounds of testing** (covering both AR and VR components), collect feedback, and iterate.  
- **Peer Evaluation:** All members evaluate each other's contributions; used in individual assessment.


---

# Deliverables

## Week 3: Project Proposal

- Problem statement & engineering context.  
- Target users / stakeholders.  
- Description of both planned VR and AR components and how they connect.  
- Key technical components from course to be used in each modality.  
- Preliminary rationale for chosen design principles in both AR and VR.  
- Success criteria / evaluation metrics for each component.  
- Team roles and timeline.

> A markdown or PDF (≤3 pages) report along with a 3–5 minute in-class pitch.

## Week 7: Midterm Prototype

- Working partial implementation showing **core functionality in both VR and AR** (could be a minimal version of each).  
- Updated design rationale for both VR and AR components.  
- First internal usability/functional test covering at least one user flow in VR and one in AR (method, participants, findings).
- Planned iterations based on feedback.
- Evidence of applied design principles to date in both modalities.
- Technical architecture overview (how VR and AR subsystems are organized and, if applicable, integrated).

> Demo along with a repo tag `midterm`, a report (4–6 pages), and a short video walkthrough (1–2 minutes).

## Week 13: Final System + Evaluation

- Polished VR and AR components (integrated or complementary) implementing promised features.  
- Results from second internal test with iterations, covering VR and AR flows.  
- Design principles assessment: how principles were applied in each modality with evidence.  
- Description of interaction between AR and VR if applicable.  
- User scenarios / usage guide that explain transitions or joint workflows.  
- Technical documentation (architecture, build/run/deploy instructions, limitations).  
- Deployment guidance (e.g., headset simulation fallback, mobile AR setup).  
- Final presentation (8–10 minutes) demonstrating both components and their engineering impact.
- Team reflection covering collaboration, design/technical trade-offs, dual-modality challenges, and lessons learned in human-centered XR development.  
- Individual contribution summary with **peer evaluations** (structured form).

## Code & Repository

- Meaningful commit history with tags/releases for proposal, midterm, and final.  
- Top-level README describing the combined AR+VR solution, build/run instructions, and known issues.  
- Embedded or linked media (screenshots, GIFs, video).  
- Clear module/namespace separation and organization.

## Graduate Extensions

Graduate teams must do the above plus:

1. **Focused Literature Review:**  
   - Select **8–10 recent** peer-reviewed papers (from venues such as **IEEE VR, IEEE ISMAR, ACM CHI, ACM UIST, ACM DIS**, or similar) that inform their AR+VR solution (e.g., multimodal integration, attention guidance across modalities, hybrid workflows, context-aware transitions, comfort in VR vs. AR).  
   - Summarize each (≤250 words) and explain how it influenced design/implementation decisions.

2. **Research-Informed Enhancement:**  
   - Integrate a research-inspired innovation in either or both modalities (e.g., adaptive cross-modality cues, context-sensitive AR-to-VR handoff, hybrid evaluation of attention guidance).  
   - Provide comparative insight (baseline vs. enhanced behavior) qualitatively or with simple metrics.

3. **Structured Validation:**  
   - Conduct a structured internal study (e.g., comparative user flows across modalities, heuristic evaluation of hybrid transitions).
   - Analyze findings based on multiple research hypotheses motivated by the literature review, and in the context of design principles/literature.


## Deliverable Checklist

- [ ] Project proposal + pitch  
- [ ] Midterm prototype (both VR & AR) + interim report + walkthrough  
- [ ] Final integrated or complementary VR+AR system + evaluation report + presentation  
- [ ] Team reflection + individual peer evaluations  
- [ ] Clean GitHub repo with tagged milestones, documentation, media  
- [ ] (Grad only) Literature summaries, research-informed enhancement, structured validation  

## Logistics

- Team formation by Week 2.  
- Proposal due Week 3.  
- Midterm deliverable due Week 7.  
- Final deliverable due Week 13.  
- Reflection & peer evaluations due Week 14.  
- Submission via GitHub Classroom with tagged releases.  
- Final presentations at end of term; all team members must participate.

---

# Evaluation

## Undergraduate Core (100 points)

**Problem Framing & Engineering Relevance (10 pts)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Real-World Justification | Clear engineering problem, stakeholders, and articulated value of dual-modality XR solution. | 5 |
| Technical Breadth | Meaningful use of ≥3 course pillars, with both AR and VR components represented. | 5 |

**Design Principle Application (20 pts)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Coverage & Evidence | Principles applied in both AR and VR; documented with concrete artifacts. | 10 |
| Quality of Interpretation | Thoughtful use of principles in interface, interaction, feedback, transitions, and integration. | 10 |

**Technical Implementation & Functionality (25 pts)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Core Features Working | VR and AR components function as promised and demonstrate the engineered solution. | 10 |
| XR Mechanics | Correct application of VR (locomotion/navigation/UI/feedback) and AR (tracking/anchoring/spatial awareness/interactions). | 10 |
| Code Quality & Organization | Modular design, namespaces, clean code, maintainability across both subsystems. | 5 |

**Usability Testing & Iteration (15 pts)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Testing Rounds | Two distinct internal testing iterations covering both modalities. | 8 |
| Iterative Response | Clear evidence that feedback led to improvements in VR and/or AR. | 7 |

**Communication & Documentation (15 pts)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Reports & Rationale | Proposal, interim, and final clearly articulate dual-modality design and evolution. | 6 |
| Presentation & Demo | Effective final presentation showing interplay of AR and VR; working demo. | 5 |
| Repository & Instructions | README, build/run guidance, media, versioning. | 4 |

**Team Process & Peer Evaluation (15 pts)**

| Criterion | Description | Points |
|-----------|-------------|--------|
| Collaboration & Roles | Balanced contributions, clear role distribution, consistent with peer evaluations. | 8 |
| Reflection Depth | Insightful analysis of process, dual-modality challenges, and learning. | 7 |

## Graduate-Specific Add-On (up to +15 pts)

| Criterion | Description | Points |
|-----------|-------------|--------|
| Literature Review Integration | Relevance and synthesis of selected literature into the hybrid experience. | 5 |
| Research-Informed Innovation | Novel enhancement grounded in research; execution or rigorous rationale. | 5 |
| Structured Validation | Depth and analysis of internal study addressing AR/VR integration and design principles. | 5 |

> Graduate teams grades are subject to normalization per course policy.

## Peer Evaluation Mechanism

Each team member will rate their peers on the following. Use the descriptions to guide your assessment.

- **Contribution Quantity & Quality:** The extent and substance of the work the team member delivered—did they take on a fair share of tasks, and was their output technically sound, thoughtful, and aligned with the project goals?
- **Communication:** How effectively the team member shared updates, asked for or gave feedback, explained ideas or problems, and kept the team informed to enable smooth coordination.
- **Reliability:** Whether the team member followed through on commitments, met agreed-upon deadlines, and could be counted on to complete assigned tasks without excessive prompting.
- **Initiative:** The degree to which the team member proactively identified needs, proposed improvements or solutions, and took action without waiting to be told.
- **Collaboration:** How well the team member worked with others—listening, integrating input, resolving disagreements constructively, and contributing to a positive team atmosphere.

> Peer evaluations inform the **Team Process & Reflection** score and can adjust individual weighting.