export interface MarketReport {
    id: string;
    title: string;
    content: string;
    summary_3lines: string;
    tags: string[];
    image_url: string;
    created_at: string;
    topic_id?: string;
    status: string;
}

export type SectorType = 'ENTERPRISE' | 'CRYPTO_NATIVE' | 'REGULATION';
