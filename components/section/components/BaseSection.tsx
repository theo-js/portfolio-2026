import { SectionId } from '../SectionId.enum';
import { ViewportSection, type ViewportSectionProps } from '@/components/ui/layout/ViewportSection';

export const BaseSection: React.FC<Omit<ViewportSectionProps, 'id'> & { id: SectionId }> = ({
  id,
  ...props
}) => <ViewportSection id={id} {...props} />;
