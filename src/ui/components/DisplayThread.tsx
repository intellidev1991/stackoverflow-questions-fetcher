/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonToolbar,
  Divider,
  Modal,
  Placeholder,
  Tooltip,
  Whisper,
} from "rsuite";
import { IQuestionItem } from "../../core/interfaces";
import ReactMarkdown from "react-markdown";
//@ts-ignore
import remarkGfm from "remark-gfm";

import ResizeIcon from "@rsuite/icons/Resize";

interface IDisplayThreadProps {
  open: boolean;
  onClose: (() => void) | undefined;
  data: IQuestionItem | undefined;
}
const { Paragraph } = Placeholder;

const tooltip = (
  <Tooltip>
    Click here to open the question on the stack overflow website.
  </Tooltip>
);

const DisplayThread: React.FC<IDisplayThreadProps> = React.memo(
  ({ open = false, onClose = undefined, data = undefined }) => {
    const handleClose = () => {
      if (onClose) onClose();
    };

    return (
      <div className="modal-container">
        <Modal full open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title className="mb-0">
              <Whisper
                placement="bottomStart"
                controlId="control-id-hover"
                trigger="hover"
                speaker={tooltip}
              >
                <span
                  className="text-xl font-semibold text-gray-900 cursor-pointer hover:opacity-70 hover:underline flex flex-row justify-start items-center"
                  onClick={() => {
                    window.open(data?.link);
                  }}
                >
                  <ResizeIcon className="mr-2" />
                  {data?.title}
                </span>
              </Whisper>

              <div className="flex flex-row justify-start items-center mt-2">
                <span className="text-xs">{`Question ID: ${data?.question_id} | View count: ${data?.view_count} | Up vote count: ${data?.up_vote_count} | Is answered?`}</span>
                &nbsp;
                <span
                  className={`text-xs font-semibold ${
                    data?.is_answered ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {data?.is_answered ? " YES" : " NO"}
                </span>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Divider />
          <Modal.Body>
            {!data?.body_markdown && <Paragraph rows={8} />}
            {data?.body_markdown && (
              <ReactMarkdown
                children={data?.body_markdown}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </Modal.Body>
          <Modal.Footer className="mx-6 my-2">
            <Button onClick={handleClose} className="w-24" appearance="primary">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);

export { DisplayThread };

const styles = {};
