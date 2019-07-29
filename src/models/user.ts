export class User {
  public $key: string
  constructor(
    public name: string,
    public usename: string,
    public email: string,
    public password: string,
    public uid: string,
    public photo: string,

  ) {}
}
