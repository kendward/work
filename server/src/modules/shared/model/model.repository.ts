import {
  FilterQuery,
  Model,
  MongooseBaseQueryOptionKeys,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { Document } from 'mongoose';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from '../serializers/model.serializer';

export class ModelRepository<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: object, saveOptions?: SaveOptions): Promise<CreatedModel> {
    const createdEntity = new this.model(doc);
    const savedResult = await createdEntity.save(saveOptions);
    return {
      id: savedResult.id,
      created: !!savedResult.id,
      createdBy: savedResult.get('createdBy'),
      createdAt: savedResult.get('createdAt'),
    };
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, options);
  }

  async findOne(
    filter: FilterQuery<T>,
    options?: QueryOptions,
  ): Promise<T | null> {
    return await this.model.findOne(filter, options);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async deleteMany(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.deleteMany(filter);
    return { deletedCount, deleted: !!deletedCount };
  }

  async deleteOne(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.deleteOne(filter);
    return { deletedCount, deleted: !!deletedCount };
  }

  async updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: Pick<
      QueryOptions<T>,
      'timestamps' | MongooseBaseQueryOptionKeys
    > & {
      [other: string]: any;
    },
  ): Promise<UpdatedModel> {
    return await this.model.updateOne(filter, updated, options);
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: Pick<
      QueryOptions<T>,
      'timestamps' | MongooseBaseQueryOptionKeys
    > & {
      [other: string]: any;
    },
  ): Promise<UpdatedModel> {
    return await this.model.updateMany(filter, updated, options);
  }
}
