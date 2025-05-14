// import { TabHeader } from "@/components/TabHeader";
// import { Button } from "@/components/ui/button";
// import { Plus } from "lucide-react";
import React from "react";
// import { useLocation } from "react-router-dom";

const ProductsManagement: React.FC = () => {

  // const location = useLocation();
  // const path = location.pathname;

  // const buttonText = "Add new Product";
  // const buttonIcon = <Plus className="h-4 w-4" />;
  // const searchPlaceholder = "Search products by SKU, name...";
  // const currentTab = path.includes("products") ? "Products Management" : "Dashboard";

  return (
    <React.Fragment>
      {/* <TabHeader
        tabName={currentTab}
        onAddClick={() => console.log('Add product')}
        addButtonText={buttonText}
        addButtonIcon={buttonIcon}
        searchPlaceholder={searchPlaceholder}
        onSearch={(query) => console.log('Search:', query)}
      // customButtons={
      //   <>
      //     <Button variant="outline" size="sm">
      //       Export
      //     </Button>
      //     <Button variant="outline" size="sm">
      //       Import
      //     </Button>
      //   </>
      // }
      /> */}
      <h2>Products Management</h2>
    </React.Fragment>
  );
};

export default ProductsManagement;