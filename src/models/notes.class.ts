export class Notes {
  title!: string;
  description!: string;
  id!: string;


  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.description = obj ? obj.description : '';
    this.id = obj ? obj.id : '';
  }


  public toJSON() {
    return {
      title: this.title,
      description: this.description,
      id: this.id,
    }
  }
}
