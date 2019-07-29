export class Chat {
  public $key:string;

  constructor(
    public lasMessage: string,
    public timestamp: any,
    public title:string,
    public photo:string,
    public user_id:string
  ){

  }
}
