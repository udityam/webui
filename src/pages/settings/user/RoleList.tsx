import { DataTablePage } from "@/components/DataTablePage";
import { MODULE_CONFIGS } from "@/lib/moduleConfigs";

const RoleList = () => {
  return (
    <DataTablePage
      config={MODULE_CONFIGS["/console/settings/roles"]}
    />
  );
};

export default RoleList;