/**
 * Safely parses string array fields (mskills, suggestions) which might be returned as JSON strings,
 * comma-separated strings, or arrays.
 */
export function parseJsonArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;

  if (typeof data === 'string') {
    const trimmed = data.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // Fallback if JSON parse fails
      }
    }
    // Fallback: splitting by comma
    return trimmed.split(',').map(item => item.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  }

  return [];
}

/**
 * Formats ISO date string to readable format
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (e) {
    return dateString;
  }
}

/**
 * Returns color classes and labels for match score ranges
 */
export function getScoreCategory(score) {
  const numScore = Number(score) || 0;
  if (numScore >= 80) {
    return {
      label: 'Excellent Match',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      textClass: 'text-emerald-600',
      strokeColor: '#059669',
      bgColor: '#ecfdf5',
    };
  } else if (numScore >= 60) {
    return {
      label: 'Strong Match',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      textClass: 'text-blue-600',
      strokeColor: '#2563eb',
      bgColor: '#eff6ff',
    };
  } else if (numScore >= 40) {
    return {
      label: 'Moderate Match',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      textClass: 'text-amber-600',
      strokeColor: '#d97706',
      bgColor: '#fffbeb',
    };
  } else {
    return {
      label: 'Needs Work',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      textClass: 'text-rose-600',
      strokeColor: '#e11d48',
      bgColor: '#fff1f2',
    };
  }
}
