import React from 'react';
import PropTypes from 'prop-types';
import { PageTemplate } from '../../templates/page-template';

const PageTemplatePreview = ({ entry, widgetFor }) => (
  <PageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
);

PageTemplatePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }).isRequired,
  widgetFor: PropTypes.func.isRequired
};

export default PageTemplatePreview;
