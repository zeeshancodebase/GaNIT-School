// utils/logHelper.js

exports.generateLogs = ({ modelId, modelType, changedBy, fields, originalDoc, updatedFields }) => {
  const logs = [];

  fields.forEach(field => {
    if (updatedFields[field] !== undefined && updatedFields[field] !== originalDoc[field]) {
      logs.push({
        modelId,
        modelType,
        changedBy,
        changeType: `${field}_update`,
        oldValue: originalDoc[field],
        newValue: updatedFields[field],
      });
    }
  });

  return logs;
};


exports.generateNestedLogs = ({
  modelId,
  modelType,
  changedBy,
  fields,
  originalDoc,
  updatedFields,
}) => {
  const logs = [];

  fields.forEach(field => {
    const oldVal = originalDoc?.[field];
    const newVal = updatedFields?.[field];

    if (newVal !== undefined && String(newVal) !== String(oldVal)) {
      logs.push({
        modelId,
        modelType,
        changedBy,
        changeType: `${field}_update`,
        oldValue: oldVal,
        newValue: newVal,
      });
    }
  });

  return logs;
};
