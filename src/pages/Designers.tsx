import { PageTitle } from '../components/common/PageTitle';
import { DesignerCard } from '../components/designer/DesignerCard';
import { useFilteredContent } from '../hooks/useFilteredContent';

export function Designers() {
  const { designers } = useFilteredContent();
  return (
    <>
      <PageTitle title="Designers" subtitle="Follow boutiques, inspect portfolio previews, and start conversations." />
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {designers.map((designer) => <DesignerCard key={designer.id} designer={designer} />)}
      </div>
    </>
  );
}
