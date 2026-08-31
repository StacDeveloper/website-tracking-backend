export function FormatCategoryMeta(category: string) {
    return category.toLowerCase().split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
}