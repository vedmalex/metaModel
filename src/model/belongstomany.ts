import { RelationBase, RelationBaseInput, RelationBaseStorage } from './relationbase';
import { EntityReference } from './entityreference';

export type BelongsToManyInput = RelationBaseInput & {
  belongsToMany: string
  using: string
}

export type BelongsToManyStorage = RelationBaseStorage & {
  belongsToMany?: EntityReference
  belongsToMany_?: string
  using?: EntityReference
  using_?: string
}

export class BelongsToMany extends RelationBase {

  $obj: BelongsToManyStorage

  constructor(obj: BelongsToManyInput) {
    super(obj);
  }

  get belongsToMany() {
    return this.$obj ? this.$obj.belongsToMany : undefined;
  }

  get using() {
    return this.$obj ? this.$obj.using : undefined;
  }

  get ref() {
    return this.$obj ? this.$obj.belongsToMany : undefined;
  }

  updateWith(obj: BelongsToManyInput) {
    if (obj) {
      super.updateWith(obj);

      const result = Object.assign({}, this.$obj);

      let belongsToMany_ = obj.belongsToMany;

      let using_ = obj.using;

      let belongsToMany;
      if (belongsToMany_) {
        belongsToMany = new EntityReference(belongsToMany_);
      }

      let using;
      if (using_) {
        using = new EntityReference(using_);
      } else {
        using = new EntityReference(`${obj.name || obj.entity}#${obj.entity.toLowerCase()}`);
      }

      if (!this.$obj.name_ && using) {
        result.name = using.entity;
      }

      result.belongsToMany_ = belongsToMany_;
      result.belongsToMany = belongsToMany;

      result.using_ = using_;
      result.using = using;

      this.$obj = Object.assign({}, result);
    }
  }
  // it get fixed object
  toObject() {
    let props = this.$obj;
    let res = super.toObject();
    return JSON.parse(
      JSON.stringify(
        Object.assign(
          {},
          res,
          {
            belongsToMany: props.belongsToMany ? props.belongsToMany.toString() : undefined,
            using: props.using ? props.using.toString() : undefined,
          }
        )
      )
    );
  }

  // it get clean object with no default values
  toJSON() {
    var props = this.$obj;
    let res = super.toJSON();
    return JSON.parse(
      JSON.stringify(
        Object.assign(
          {},
          res,
          {
            belongsToMany: props.belongsToMany_,
            using: props.using_,
          }
        )
      )
    );
  }
}