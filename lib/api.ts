import { supabase } from '@/lib/supabase';
import { MarketReport, SectorType } from '@/types';

export async function getReportsBySector(sector: SectorType, limit = 4): Promise<MarketReport[]> {
    const { data, error } = await supabase
        .from('market_reports')
        .select('*')
        .contains('tags', [sector])
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error(`Error fetching ${sector} reports:`, error);
        return [];
    }

    return data as MarketReport[] || [];
}

export async function getRecentReports(limit = 4): Promise<MarketReport[]> {
    const { data, error } = await supabase
        .from('market_reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent reports:', error);
        return [];
    }

    return data as MarketReport[] || [];
}

export async function getReportById(id: string): Promise<MarketReport | null> {
    const { data, error } = await supabase
        .from('market_reports')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching report:', error);
        return null;
    }

    return data as MarketReport;
}
