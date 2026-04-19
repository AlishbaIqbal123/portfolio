import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates total experience duration across all entries.
 * Returns a formatted string like "1.5+ Years" or "6 Months".
 */
export function calculateTotalExperience(experiences: any[]) {
    if (!experiences || experiences.length === 0) return '0+ Years';
    
    let totalMonths = 0;

    experiences.forEach((exp) => {
        const duration = exp.duration || "";
        if (!duration || !duration.includes('-')) return;

        const parts = duration.split('-').map((s: string) => s.trim());
        const startStr = parts[0];
        const endStr = parts[1];
        
        const startDate = parseExperienceDate(startStr);
        const endDate = endStr?.toLowerCase() === 'present' ? new Date() : parseExperienceDate(endStr);

        if (startDate && endDate) {
            // Calculate difference in months
            const diffInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
            totalMonths += Math.max(1, diffInMonths); // Count at least 1 month
        }
    });

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    if (years >= 1) {
        if (remainingMonths >= 1) {
            // Show as "1.5+ Years" format
            const decimal = Math.round((remainingMonths / 12) * 10) / 10;
            return `${(years + decimal).toFixed(1)}+ Years`;
        }
        return `${years}+ Years`;
    }
    
    return `${totalMonths} Month${totalMonths !== 1 ? 's' : ''}`;
}

function parseExperienceDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    
    // Standard JS Date constructor handles most formats like "Jan 2023", "2023-01", etc.
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;
    
    // Explicit month-year parsing for "Month Year" format
    const parts = dateStr.split(/[\s,]+/);
    if (parts.length >= 2) {
        const months: Record<string, number> = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
        };
        
        let monthIndex = -1;
        let yearValue = -1;

        for (const p of parts) {
            const clean = p.toLowerCase().substring(0, 3);
            if (months[clean] !== undefined) monthIndex = months[clean];
            else if (!isNaN(parseInt(p)) && p.length >= 4) yearValue = parseInt(p);
        }

        if (monthIndex !== -1 && yearValue !== -1) {
            return new Date(yearValue, monthIndex, 1);
        }
    }
    
    return null;
}
