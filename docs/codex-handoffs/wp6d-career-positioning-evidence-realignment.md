# WP6D — Career Positioning & Evidence Realignment

**Status:** Implemented for review on 2026-09-17; executable verification and rendered bilingual review pending

**Authority:** Sean's 2026-09-17 approval and `docs/portfolio-content-contract.md`

## Approved outcome

Reframe the portfolio around this primary identity without restarting v2 or redesigning its visual system:

- English: **Computer engineer who builds and integrates software, AI, and infrastructure for physical systems.**
- Korean: **소프트웨어·AI·인프라를 로봇과 산업 시스템에 연결해 실제 현장에서 동작하게 만드는 엔지니어.**

Software engineering and system integration remain the demonstrated foundation. Automation and robotics are an expansion of that foundation, not a career restart. AI/perception support remains training or planned unless later evidence establishes completion.

## Information hierarchy

- Home: identity → selected engineering evidence → currently building → system-layer capabilities → Experience/Projects/Contact paths.
- Experience: canonical chronology and detailed contribution boundaries.
- Projects: grouped engineering-evidence index, not a set of fabricated flagship case studies.
- `canonicalContentRegistry.projects` remains reserved for later approved case studies and stays empty.

## Approved evidence boundaries

- **RUTA40:** Sean owned React UI and HTTPS API/control integration on a real vehicle. Embedded-module and backend ownership remain with their teams.
- **Daegu Smart City Challenge:** Sean integrated exposed APIs and real-time streams into frontend visualization/UI behavior. No backend WebSocket, data-pipeline, or database ownership.
- **Internal Attendance / HR Product (`몰입도`):** internal Hoek system, not a commercial external product. Full-stack contribution includes application-state rules and the 06:00 operational workday boundary.
- **Classroom LAN Chat:** self-directed FastAPI/WebSocket/SQLite LAN application used by 22 classmates.
- **PLC / robot-cell exercise:** guided classroom/team work on shared equipment. Sean participated in handshake/state reasoning, I/O mapping and debugging, multi-dock sequencing, completion signaling, and integration discussions.
- **ROS2 Industrial Robot Cell Integration / ROS2 산업용 로봇 셀 통합:** self-directed individual work using shared training-facility hardware.

## Current-build maturity boundary

Completed starting evidence:

- PLC ↔ Neuromeka real-hardware integration;
- CC-Link handshake reasoning;
- multi-dock sequencing and servo/loading-dock coordination.

Planned, not completed:

- ROS2 control layer;
- orchestration/state machine;
- timeout/fault/recovery handling;
- later perception and edge-AI integration.

The content model and presentation must label these separately. A completed record cannot contain planned scope, and current work requires both completed starting evidence and a separate planned list.

## Editorial state

The newly drafted English and Korean supporting copy is factually bounded but remains editorially reviewable. Sean must review representative rendered Home, Experience, and Projects pages in both languages before WP6D acceptance or public launch.

## Exclusions

- No flagship case-study selection or project-detail routes.
- No broad visual redesign.
- No blog, localization-policy, route, dependency, runtime-service, deployment, domain, or cutover change.
- No claim that planned ROS2, C++, perception, OpenVINO, or edge-AI work is complete.

## Acceptance evidence still required

- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- representative English/Korean rendered review at mobile and desktop widths
- Sean's final human/editorial review of the new bilingual supporting copy

Node, Corepack, and pnpm were unavailable in the implementation environment, so WP6D cannot be accepted from static inspection alone.
