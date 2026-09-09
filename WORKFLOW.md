# seanchoi.space autonomous workflow

## Roles

Sean
- owns factual truth
- supplies content/evidence
- approves publication-sensitive decisions

Codex
- planner
- architecture/editorial authority
- reviewer
- does not normally modify implementation files

Antigravity
- implementation agent
- may edit code
- runs tests
- fixes implementation review findings

## Cycle

1. Read AGENTS.md.
2. Read the current task.
3. Ask Codex to analyze the task and define acceptance criteria.
4. Antigravity implements.
5. Run relevant tests/typecheck/lint/build.
6. Ask Codex to review the diff and verification results.
7. If Codex requests implementation changes:
   - Antigravity fixes them.
   - repeat review.
8. Maximum 3 review cycles.
9. Stop if a human-decision condition is reached.
10. Otherwise mark the task complete.

## Continue automatically for

- implementation choices
- normal refactors
- styling
- responsive behavior
- accessibility fixes
- test failures
- lint/type errors
- review findings

## Stop for Sean for

- new or uncertain factual claims
- contribution-boundary ambiguity
- privacy/publication decisions
- major information-architecture changes
- production deployment/cutover
- new paid/external services
- destructive migration

## Completion

A task is complete only when:

- acceptance criteria pass
- tests pass
- production build passes
- Codex review returns ACCEPT