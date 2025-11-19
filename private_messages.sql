
--
-- Table structure for table `pivate_messages`
--
CREATE TABLE `pivate_messages` (
  `message_id` int(11) NOT NULL,
  `to_id` int(11) NOT NULL,
  `from_id` int(11) NOT NULL,
  `message` text NOT NULL,
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for table `pivate_messages`
--
ALTER TABLE `pivate_messages`
  ADD PRIMARY KEY (`message_id`);

--
-- AUTO_INCREMENT for table `pivate_messages`
--
ALTER TABLE `pivate_messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;