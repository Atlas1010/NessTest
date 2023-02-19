import { Organizationlevels } from "./Organizationlevels";
import { Role } from "./Role";

export class User{
    public   Id :string|undefined;
    public   Organizationlevels :Organizationlevels |undefined
    public   Username :string|undefined
    public   Role :Role
    public   Email:string
    public   Phone: string
    public   Managerid :string
    public   Password :string
    public   Salt: string
    public   IsTemporaryPassword :boolean
    public   IsActive :boolean
    public   CreateDate: Date
    public   LastUpdateDate :Date
}