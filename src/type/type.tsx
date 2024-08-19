interface Thumbnail {
  file_name: string;
  url: string;
}

interface Medium {
  file_name: string;
  url: string;
}

interface Avatar {
  uuid: string;
  file_name: string;
  cloudinary_file_name: string;
  url: string;
  format: string;
  mimetype: string;
  width: number;
  height: number;
  size: number;
  thumbnail: Thumbnail;
  medium: Medium;
}

interface Role {
  uuid: string;
  title_fr: string;
  title_en: string;
  code: string;
    }

interface User {
  uuid: string;
  email: string;
  firstname: string;
  lastname: string;
  is_new_user: boolean;
  avatar: Avatar;
  date_added: string;
  date_modified: string;
  role:Role;
}

interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginResponse {
  user: User;
  token: Token;
}
