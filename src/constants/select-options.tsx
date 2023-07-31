export interface SelectOptionsRenderDropDown {
  title: string;
  image?: string;
}

export interface Member {
  name: string;
  image: {
    url?: string;
    color?: string;
    text?: string;
  };
  gmail?: string;
  ID: number;
}
