import { isDevelopment } from '@util';
import { retry } from '@core/app';
import query, { isValidQuery, invalidQuery } from '@core/uiAutomation/query';

export default function selectRadio(parent, groupQ, buttonQ) {
  if (isDevelopment()) {
    if (!isValidQuery(groupQ)) throw new Error(invalidQuery({ groupQ }));
    if (!isValidQuery(buttonQ)) throw new Error(invalidQuery({ buttonQ }));
  }

  return retry(() => {
    const radioGroup = query(parent.radioGroups, groupQ);
    const radioButton = query(radioGroup.radioButtons, buttonQ);

    if (radioButton.value() === 1) return;
    radioButton.actions.byName('AXPress').perform();
  });
}
