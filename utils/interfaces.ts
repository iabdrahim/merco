export interface IUser {
  _id: string;
  name: string;
  password: string;
  email: string;
  avatar: string;
  username: string;
  location: string;
  phoneNumber: string;
  saved: [string];
  createdAt: Date;
}
export interface IAd {
  _id: string;
  title: string;
  price: number;
  tags: [string];
  city: string;
  details: [{ name: string; value: string }];
  description: string;
  catagorie: string;
  images: [string];
  authorId: string;
  author: IUser;
  createdAt: Date;
  rating: number;
}

export interface IChat {
  _id: string;
  messages: [
    {
      _id: string;
      userId: string;
      content: string;
      createdAt: Date;
    }
  ];
  createdAt: Date;
  seller: IUser;
  buyer: IUser;
}
