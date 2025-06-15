
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface HistoryEntry {
  page: string;
  data: any | null;
}

interface BreadcrumbNavProps {
  history: HistoryEntry[];
  navigateToHistory: (index: number) => void;
}

const formatPageName = (name: string) => {
  if (!name) return '';
  const withSpaces = name.replace(/([A-Z])/g, ' $1').replace(/Page/g, '').trim();
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ history, navigateToHistory }) => {
  if (history.length <= 1) {
    return null;
  }

  return (
    <div className="mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          {history.map((entry, index) => (
            <React.Fragment key={entry.page + index}>
              <BreadcrumbItem>
                {index < history.length - 1 ? (
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToHistory(index);
                    }}
                  >
                    {formatPageName(entry.page)}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{formatPageName(entry.page)}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < history.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
