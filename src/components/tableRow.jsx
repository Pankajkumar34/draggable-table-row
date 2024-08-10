

import React from "react";
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";

/**
 * @param {Object} props - The props object.
 * @param {Object} props.item - The data item for this row.
 * @param {number} props.index - The index of the item in the list.
 * @param {Function} props.customeRow - A function to render custom content inside the row.
 * @param {string} [props.tableBodyRowClass] - Custom CSS class for the table row element.
 */
const TableRow = ({ item, index,customeRow ,tableBodyRowClass}) => {
  const [{ opacity }, dragRef] = useDrag({
    type: "ITEM_TYPE",
    item: { id: item._id, originalIndex: index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <tr
      ref={dragRef}
      style={{ opacity }}
      className={tableBodyRowClass}
    >
      {
        customeRow && customeRow(item,index)
      }
     
    </tr>
  );
};

TableRow.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    customeRow: PropTypes.func.isRequired,
    tableBodyRowClass: PropTypes.string
  };

export default TableRow;



