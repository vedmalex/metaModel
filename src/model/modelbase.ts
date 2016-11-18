import * as inflected from 'inflected';
import { ModelPackage } from './modelpackage';
import { ModelBaseStorage, ModelBaseInput } from './interfaces';

export class ModelBase {
  protected $obj: ModelBaseStorage;

  constructor(obj: ModelBaseInput) {
    if (obj) {
      this.updateWith(obj);
    }
  }

  get name(): string {
    return this.$obj.name;
  }

  get title(): string {
    return this.$obj.title;
  }

  get description(): string {
    return this.$obj.description;
  }

  public toString() {
    return JSON.stringify(this.toObject());
  }

  public toObject(modelPackage?: ModelPackage) {
    let props = this.$obj;
    return {
      name: props.name,
      title: props.title,
      description: props.description,
    };
  }

  public toJSON(modelPackage?: ModelPackage): ModelBaseInput {
    let props = this.$obj;
    return {
      name: props.name_,
      title: props.title_,
      description: props.description_,
    };
  }

  public updateWith(obj: ModelBaseInput) {
    if (obj) {

      const result: ModelBaseStorage = Object.assign({}, this.$obj);

      let $name = obj.name;
      let $title = obj.title;
      let $description = obj.description;

      let name = inflected.camelize($name.trim(), false);

      let title = $title ? $title.trim() : '';

      let description = $description ? $description.trim() : '';

      if (!title) {
        title = inflected.titleize(name);
      }

      if (!description) {
        description = title || $title;
      }
      description = inflected.titleize(description);

      result.name_ = $name;
      result.name = name;

      result.title_ = $title;
      result.title = title;

      result.description_ = $description;
      result.description = description;

      this.$obj = Object.assign({}, result);
    }
  }

  public clone() {
    return new (<typeof ModelBase>this.constructor)(this.toJSON());
  }
}
