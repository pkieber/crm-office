export class Notes {
  title!: string;
  description!: string;
  customIdName!: string;


  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.description = obj ? obj.description : '';
    this.customIdName = obj ? obj.customIdName : '';
  }


  public toJSON() {
    return {
      title: this.title,
      description: this.description,
      customIdName: this.customIdName,
    }
  }
}
