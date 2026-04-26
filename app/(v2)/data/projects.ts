/**
 * Project data structure for Selected Work section
 * Each project showcases a different scroll-driven interaction pattern
 */

export interface ProjectHotspot {
    label: string
    x: number // percentage from left
    y: number // percentage from top
    subLabel: string
}

export interface ProjectStats {
    label: string
    value: string
}

export interface RAGNode {
    id: string
    label: string
    type: 'query' | 'embed' | 'retrieve' | 'store' | 'rerank' | 'generate'
    x: number
    y: number
}

export interface RAGEdge {
    from: string
    to: string
    label: string
    duration: string
}

export interface DecisionEntry {
    id: string
    number: string
    title: string
    description: string
    nodeId?: string
}

export interface ProjectData {
    id: string
    codename: string
    number: string
    name: string
    type: 'vesta' | 'rag' | 'clueless'
    breadcrumb: string

    // Vesta-specific
    vestaData?: {
        clientType: string
        year: string
        beforeSentence: string
        hotspots: ProjectHotspot[]
        stats: ProjectStats[]
    }

    // RAG-specific
    ragData?: {
        terminalOutput: Array<{
            type: 'command' | 'output' | 'comment'
            text: string
        }>
        nodes: RAGNode[]
        edges: RAGEdge[]
        finalStat: string
    }

    // Clueless-specific
    cluelessData?: {
        title: string
        role: string
        year: string
        status: string
        tags: string[]
        nodes: RAGNode[] // reusing node structure for architecture
        edges: RAGEdge[]
        decisions: DecisionEntry[]
    }
}

/**
 * Project metadata for entry animation and HUD
 */
export interface ProjectMeta {
    codename: string
    fullName: string
    number: string
}

export const PROJECTS_META: ProjectMeta[] = [
    { codename: 'VESTA', fullName: 'Vesta', number: '01' },
    { codename: 'RAG', fullName: 'RAG', number: '02' },
    { codename: 'CLUELESS', fullName: 'Clueless', number: '03' },
]

/**
 * Mock project data
 * Colors/images can be swapped with real assets later
 */
export const PROJECTS: ProjectData[] = [
    {
        id: 'vesta',
        codename: 'VESTA',
        number: '01',
        name: 'Vesta',
        type: 'vesta',
        breadcrumb: '/work/vesta',
        vestaData: {
            clientType: 'Healthcare Tech',
            year: '2024',
            beforeSentence: 'Spreadsheets → production in 3 weeks.',
            hotspots: [
                {
                    label: 'Role-based Auth',
                    x: 30,
                    y: 40,
                    subLabel: 'Multi-level access control',
                },
                {
                    label: 'Patient Search',
                    x: 60,
                    y: 50,
                    subLabel: 'Real-time indexed lookup',
                },
                {
                    label: 'PDF Reports',
                    x: 50,
                    y: 65,
                    subLabel: 'Auto-generated documents',
                },
            ],
            stats: [
                { label: 'Faster', value: '70%' },
                { label: 'Records', value: '2,400' },
                { label: 'Load time', value: '0.9s' },
            ],
        },
    },
    {
        id: 'rag',
        codename: 'RAG',
        number: '02',
        name: 'RAG',
        type: 'rag',
        breadcrumb: '/work/rag',
        ragData: {
            terminalOutput: [
                {
                    type: 'command',
                    text: 'query: "what drugs interact with warfarin?"',
                },
                {
                    type: 'output',
                    text: '[embed]    text → 1536d vector            ·  42ms',
                },
                {
                    type: 'output',
                    text: '[retrieve] pinecone top-k=8               ·  287ms',
                },
                {
                    type: 'output',
                    text: '[rerank]   cross-encoder → 3 survived     ·  91ms',
                },
                {
                    type: 'output',
                    text: '[generate] gpt-4o · grounded              ·  0.47s',
                },
                {
                    type: 'comment',
                    text: '─ answer traced to 3 source chunks ─',
                },
            ],
            nodes: [
                { id: 'query', label: 'Query', type: 'query', x: 10, y: 50 },
                { id: 'embed', label: 'Embed', type: 'embed', x: 25, y: 30 },
                { id: 'retrieve', label: 'Retrieve', type: 'retrieve', x: 40, y: 10 },
                {
                    id: 'pinecone',
                    label: 'Pinecone',
                    type: 'store',
                    x: 55,
                    y: 20,
                },
                { id: 'rerank', label: 'Rerank', type: 'rerank', x: 70, y: 35 },
                { id: 'generate', label: 'Generate', type: 'generate', x: 85, y: 50 },
            ],
            edges: [
                {
                    from: 'query',
                    to: 'embed',
                    label: '1536d',
                    duration: '42ms',
                },
                {
                    from: 'embed',
                    to: 'retrieve',
                    label: 'text vector',
                    duration: '287ms',
                },
                {
                    from: 'retrieve',
                    to: 'pinecone',
                    label: 'top-k=8',
                    duration: '91ms',
                },
                {
                    from: 'pinecone',
                    to: 'rerank',
                    label: '3 docs',
                    duration: '91ms',
                },
                {
                    from: 'rerank',
                    to: 'generate',
                    label: 'ranked',
                    duration: '0.47s',
                },
            ],
            finalStat: '-52% hallucinations',
        },
    },
    {
        id: 'clueless',
        codename: 'CLUELESS',
        number: '03',
        name: 'Clueless',
        type: 'clueless',
        breadcrumb: '/work/clueless',
        cluelessData: {
            title: 'Real-time Multiplayer Game',
            role: 'Full-Stack Engineer',
            year: '2024',
            status: 'In Production',
            tags: ['GraphQL', 'WebSockets', 'Redis'],
            nodes: [
                { id: 'client', label: 'Client', type: 'query', x: 10, y: 50 },
                {
                    id: 'gateway',
                    label: 'GraphQL Gateway',
                    type: 'embed',
                    x: 30,
                    y: 50,
                },
                { id: 'auth', label: 'Auth Service', type: 'retrieve', x: 50, y: 30 },
                { id: 'game', label: 'Game Service', type: 'embed', x: 50, y: 50 },
                { id: 'match', label: 'Match Service', type: 'embed', x: 50, y: 70 },
                { id: 'redis', label: 'Redis Pub/Sub', type: 'store', x: 70, y: 50 },
                { id: 'postgres', label: 'Postgres', type: 'retrieve', x: 90, y: 50 },
            ],
            edges: [
                {
                    from: 'client',
                    to: 'gateway',
                    label: 'graphql',
                    duration: '10ms',
                },
                {
                    from: 'gateway',
                    to: 'auth',
                    label: 'validate',
                    duration: '5ms',
                },
                {
                    from: 'gateway',
                    to: 'game',
                    label: 'mutation',
                    duration: '15ms',
                },
                {
                    from: 'game',
                    to: 'redis',
                    label: 'publish',
                    duration: '8ms',
                },
                {
                    from: 'redis',
                    to: 'match',
                    label: 'subscribe',
                    duration: '8ms',
                },
                {
                    from: 'match',
                    to: 'postgres',
                    label: 'store',
                    duration: '20ms',
                },
                {
                    from: 'postgres',
                    to: 'client',
                    label: 'response',
                    duration: '25ms',
                },
            ],
            decisions: [
                {
                    id: 'd01',
                    number: '01',
                    title: 'Chose GraphQL over REST',
                    description:
                        'Client needs to shape data per view. GraphQL reduces over-fetching by 60%.',
                    nodeId: 'gateway',
                },
                {
                    id: 'd02',
                    number: '02',
                    title: 'Redis pub/sub per room',
                    description:
                        'Fanout pattern was O(n), now O(1) with room-based channels.',
                    nodeId: 'redis',
                },
                {
                    id: 'd03',
                    number: '04',
                    title: 'Events defined before code',
                    description: 'Contract-first approach. All events spec\'d in schema.',
                    nodeId: 'gateway',
                },
                {
                    id: 'd04',
                    number: '07',
                    title: 'Postgres for state, Redis for real-time',
                    description: 'Clear separation: durable state vs. transient messages.',
                    nodeId: 'postgres',
                },
                {
                    id: 'd05',
                    number: '09',
                    title: 'Auth as separate service',
                    description: 'Allows scaling independently. JWT validated per request.',
                    nodeId: 'auth',
                },
                {
                    id: 'd06',
                    number: '11',
                    title: 'Microservices over monolith',
                    description:
                        'Game, Match, Auth as separate services. Deploy independently.',
                    nodeId: 'game',
                },
                {
                    id: 'd07',
                    number: '14',
                    title: 'Server-driven game state',
                    description: 'Server is source of truth. Client sends actions only.',
                    nodeId: 'game',
                },
                {
                    id: 'd08',
                    number: '17',
                    title: 'Optimistic UI updates',
                    description: 'Client updates immediately, server is authoritative.',
                    nodeId: 'client',
                },
                {
                    id: 'd09',
                    number: '19',
                    title: 'Debounced save to Postgres',
                    description: 'Not every frame — batch writes, reduce DB load.',
                    nodeId: 'postgres',
                },
                {
                    id: 'd10',
                    number: '21',
                    title: 'Type safety end-to-end',
                    description: 'Generated types from GraphQL schema. Zero runtime surprises.',
                    nodeId: 'gateway',
                },
            ],
        },
    },
]
