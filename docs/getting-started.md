# Getting Started

## Installation

Choose your preferred package manager:

```bash
# npm
npm install peerconnect

# yarn
yarn add peerconnect

# pnpm
pnpm add peerconnect
```

### CDN Usage

For vanilla JavaScript projects, you can include PeerConnect directly via CDN:

```html
<!-- Using unpkg -->
<script src="https://unpkg.com/peerconnect/dist/peerconnect.min.js"></script>

<!-- Using jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/peerconnect/dist/peerconnect.min.js"></script>
```

## Framework Setup

### React

1. Wrap your app with the provider:

```tsx
import { PeerSyncProvider } from "peerconnect/react";

function App() {
  return (
    <PeerSyncProvider>
      <YourApp />
    </PeerSyncProvider>
  );
}
```

2. Use the hook in your components:

```tsx
import { useRoom } from "peerconnect/react";

function ChatRoom() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [state, actions] = useRoom(roomId, setRoomId);

  return (
    <div>
      <div>Status: {state.connectionStatus}</div>
      {/* Your chat UI */}
    </div>
  );
}
```

### Next.js

1. Create a client-side provider component:

```tsx
// app/providers.tsx
"use client";

import { PeerSyncProvider } from "peerconnect/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <PeerSyncProvider>{children}</PeerSyncProvider>;
}
```

2. Add the provider to your root layout:

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Vanilla JavaScript

1. Module usage:

```javascript
import { PeerConnectionManager } from "peerconnect";

const manager = new PeerConnectionManager();

// Create a room
const roomId = await manager.createRoom();

// Listen for messages
manager.on("message", (data, peerId) => {
  console.log(`Message from ${peerId}:`, data);
});
```

2. Browser usage with CDN:

```html
<script src="https://unpkg.com/peerconnect/dist/peerconnect.min.js"></script>
<script>
  const manager = new PeerConnect.PeerConnectionManager();

  async function initConnection() {
    const roomId = await manager.createRoom();
    console.log("Room created:", roomId);
  }
</script>
```

## TypeScript Support

PeerConnect is written in TypeScript and includes built-in type definitions. For the best development experience, ensure TypeScript is configured in your project:

```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

## Basic Concepts

- **Rooms**: Virtual spaces where peers connect
- **Messages**: Data exchanged between peers
- **Connection States**: Track peer connectivity
- **Type Safety**: Full TypeScript support
- **Framework Agnostic**: Works with any JavaScript setup

## Next Steps

- Check out the [Core Concepts](./core-concepts.md) guide
- See [Examples](./examples/README.md) for complete implementations
- Read the [API Reference](./api/README.md) for detailed documentation
