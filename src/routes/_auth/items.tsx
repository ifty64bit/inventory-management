import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/items')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/items"!</div>
}
