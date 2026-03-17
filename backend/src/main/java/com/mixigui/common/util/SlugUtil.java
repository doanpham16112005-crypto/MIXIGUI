package com.mixigui.common.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugUtil {

    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
    private static final Pattern MULTI_DASH = Pattern.compile("-+");

    public static String toSlug(String input) {
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String slug = NON_LATIN.matcher(
                WHITESPACE.matcher(normalized.toLowerCase(Locale.ENGLISH)).replaceAll("-")
        ).replaceAll("");
        return MULTI_DASH.matcher(slug).replaceAll("-");
    }

    private SlugUtil() {}
}
