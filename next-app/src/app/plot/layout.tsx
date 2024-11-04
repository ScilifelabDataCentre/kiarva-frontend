import { BODY_CLASSES } from "@/constants";
import "../globals.css";
import SelectionTabComponent from "@/components/SelectionTabComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SelectionTabComponent paths={{"Genomic": "genomic", "Translated": "translated"}} /> 
      {children}
    </div>
  );
}
