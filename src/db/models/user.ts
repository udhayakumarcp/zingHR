import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/database";

class User extends Model {
  public id!: number;
  public emp_code!: string;
  public password!: string;
  public jwt_token!: string;
  public auth_token!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    emp_code: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    jwt_token: DataTypes.TEXT,
    auth_token: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    underscored: true,
  }
);

export default User;
