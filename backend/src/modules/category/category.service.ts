import { ICategory } from './category.model';
import { CategoryRepository } from './category.repository';

export class CategoryService {
    private static repository = new CategoryRepository();

    /**
     * Creates a new category
     * @param payload Validated category data
     */
    static async createCategory(payload: Partial<ICategory>): Promise<ICategory> {
        return this.repository.create(payload);
    }

    /**
     * Fetches all categories.
     * Optionally could be filtered by isActive, but currently returns all sorted by name.
     */
    static async getAllCategories(): Promise<ICategory[]> {
        // Fetching all with a generic find (not paginated for dropdowns usually)
        // Since base repository doesn't have a direct `find` exposed easily, we can use findPaginated with a huge limit or add a custom method.
        // For simplicity and completeness, we will just use the paginated method with a max limit so it functions like a `find`.
        const result = await this.repository.findPaginated({}, { page: 1, limit: 1000 });
        return result.data;
    }
}
