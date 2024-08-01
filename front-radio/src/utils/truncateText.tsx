const truncateText = (text: string, maxLength: number | null | undefined) => {
    return maxLength ? text.length > maxLength ? `${text.substring(0, maxLength).trim()}...` : text.trim() : '---';
};

export default truncateText;
