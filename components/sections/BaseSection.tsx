import { SectionId } from './SectionId.enum';
import { ViewportSection, type ViewportSectionProps } from '../ui/layout/ViewportSection';

export const BaseSection: React.FC<Omit<ViewportSectionProps, 'id'> & { id: SectionId }> = ({
  id,
  ...props
}) => <ViewportSection id={id} {...props} />;
