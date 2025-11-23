
--
-- Table structure for table `pivate_messages`
--
CREATE TABLE `conversations` (
  `user1_id` INT(11),
  `user2_id` INT(11),
  `last_updated` DATETIME
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE `messages` (
  `id` INT(11) PRIMARY KEY,
  `conversation_id` INT(11),
  `sender_id` INT(11),
  `receiver_id` INT(11),
  `message` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for table `pivate_messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `pivate_messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;