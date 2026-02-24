---
name: fastapi-webhooks-events
description: Reliable webhook and event handling patterns for FastAPI services. Trigger: When receiving external webhooks or publishing internal domain events.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use
- Integrating third-party webhook providers with strict reliability needs.
- Standardizing event ingestion, deduplication, and asynchronous processing.

## Critical Patterns
- Verify signature before parsing business payload.
- Enforce idempotency using event ID + source unique key in storage.
- Acknowledge quickly (`2xx`) and hand off heavy work to background queue/worker.
- Persist raw payload + normalized event metadata for audit and replay.
- Use retries with backoff for downstream failures; avoid endless loops.
- Keep webhook router thin; processing orchestration belongs in service.

## Workflow Checklist
- Define webhook event SQLModel and unique constraints for dedup.
- Add router endpoint: verify signature, parse envelope, call service.
- Add service flow: upsert event, enqueue job, mark processing status.
- Add repository methods for event lookup/update by external ID.
- Test signature failure, duplicate delivery, retry, and out-of-order events.

## Code Examples
```python
@router.post("/webhooks/provider")
async def receive_webhook(request: Request, service: WebhookService = Depends(get_webhook_service)):
    body = await request.body()
    signature = request.headers.get("X-Signature", "")
    service.verify_signature(body, signature)
    service.ingest(body)
    return {"received": True}
```

```python
class WebhookService:
    def ingest(self, raw_body: bytes) -> None:
        event = self.parser.parse(raw_body)
        if self.repo.exists(event.source, event.external_id):
            return
        self.repo.create_pending(event)
        self.session.commit()
        self.publisher.enqueue("process_webhook", event.external_id)
```

## Commands
- `pytest tests/webhooks -q`
- `ruff check app/modules/webhooks`
- `alembic revision --autogenerate -m "add webhook events"`
- `alembic upgrade head`
