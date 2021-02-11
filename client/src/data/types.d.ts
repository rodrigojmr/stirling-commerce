interface footerNavSectionType {
  title: string;
  links: {
    name: string;
    link: string;
  }[];
}

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
