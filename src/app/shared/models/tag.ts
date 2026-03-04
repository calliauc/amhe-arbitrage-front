export class Tag {
  id!: number;
  code!: string;
}

export class TagCb extends Tag {
  checked = false;
}

export class TagsFiltres {
  tagsRequis!: Tag[];
  tagsOptions!: Tag[];
  tagsExclus!: Tag[];
}
