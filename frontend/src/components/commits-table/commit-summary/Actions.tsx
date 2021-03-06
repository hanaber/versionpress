import * as React from 'react';

import Rollback from './Rollback';
import Undo from './Undo';

interface ActionsProps {
  commit: Commit;
  enableActions: boolean;
  onUndoClick(e: React.MouseEvent): void;
  onRollbackClick(e: React.MouseEvent): void;
}

const Actions: React.StatelessComponent<ActionsProps> = (props) => {
  const {
    commit,
    enableActions,
    onUndoClick,
    onRollbackClick,
  } = props;

  if (!commit.isEnabled) {
    return <td className='column-actions' />;
  }

  return (
    <td className='column-actions'>
      {(commit.canUndo || commit.isMerge) &&
        <Undo
          commit={commit}
          enableActions={enableActions}
          onClick={onUndoClick}
        />
      }
      {commit.canRollback &&
        <Rollback
          enableActions={enableActions}
          onClick={onRollbackClick}
        />
      }
    </td>

  );
};

export default Actions;
