import Category, { ICategory } from './category.model';
import { BaseRepository } from '../../common/repositories/base.repositories';

export class CategoryRepository extends BaseRepository<ICategory> {
    constructor() {
        super(Category);
    }
}
