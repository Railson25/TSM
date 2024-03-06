import { ChampionRole } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const roles = Object.values(ChampionRole);

interface DamageSelectProps {
  onChangeRole: (role: string) => void;
}

export const DamageSelectCompareRandom = ({
  onChangeRole,
}: DamageSelectProps) => {
  return (
    <Select onValueChange={onChangeRole}>
      <SelectTrigger className="w-[180px] mb-5">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
