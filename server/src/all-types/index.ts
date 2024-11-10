export type AccountType = {
  accountType: "admin" | "user";
};

export type AdminType = AccountType & {
  adminId: string;
  email: string;
  name: string;
};

export type UserType = AccountType & {
  userId: string;
  phoneNumber: string;
  email: string;
  name: string;
  customerDetailsId: string;
};
