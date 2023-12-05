import $ from "@/utils/theme";
import type { SlideProps, SlideOptions } from "../internals/slidesHelper";
import Background from "../components/Background";
import { USDollarNoCents } from "../utils/formatter";


type OrganizationData = {
    category: string;
    raised: number;
    spent: number;
    spendingByDate?: Record<string, number>; 
    spendingByUser?: Record<string, number>; 
  };
  
  type Data = {
    organizations: Record<string, OrganizationData>;
  };

  export default function TemplateSlide({ data }: { data: Data }) {
    if (!data.organizations || Object.keys(data.organizations).length === 0) {
      return <div>No org available...</div>;
    }
  
    const firstOrgName = Object.keys(data.organizations)[0];
    const firstOrgData = data.organizations[firstOrgName];
  
    const { category, raised, spent, spendingByDate, spendingByUser } = firstOrgData;
  
    const organizationElement = (
      <div key={firstOrgName}>
        <h2>{firstOrgName}</h2>
        <p>Category: {category}</p>
        <p>Raised: {`${USDollarNoCents.format(raised / 100)}`}</p>
        <p>Spent: {`${USDollarNoCents.format(-spent / 100)}`}</p>
      </div>
    );
  
    return (
      <>
        <h1 {...$.title({})}>Org Stats</h1>
        <div>{organizationElement}</div>
        <Background />
      </>
    );
  }
  

TemplateSlide.config = {
  bg: $.red,
  duration: 5000, // 5 seconds
  skipSlide: () => false
} satisfies SlideOptions;
