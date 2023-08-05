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

export interface IMessage {
  _id: string;
  messages: [
    {
      userId: string;
      content: string;
      createdAt: Date;
    }
  ];
  sellerId: string;
  createdAt: Date;
  buyerId: string;
  seller: IUser;
  buyer: IUser;
}
