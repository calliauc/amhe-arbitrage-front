export class Tag {
  id!: number;
  code!: string;
}

export class TagCb extends Tag {
  checked: boolean = false;
}
